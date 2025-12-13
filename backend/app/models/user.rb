class User < ApplicationRecord
    has_secure_password
    before_validation :ensure_session_token

    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
    validates :password, allow_nil: true, length: {minimum: 6}
    validates :role, presence: true
    validate :role_must_be_valid
    validates :session_token, presence: true, uniqueness: true

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        user&.authenticate(password)
    end

    def ensure_session_token
        self.session_token ||= generate_session_token
    end

    def reset_session_token!
        self.session_token = generate_session_token
        save!
        session_token
    end

    has_many :tickets_created,
    class_name: "Ticket",
    foreign_key: :creator_id,
    dependent: :destroy

    has_many :tickets_assigned,
    through: :ticket_assignees,
    source: :Ticket

    private
    def role_must_be_valid
        roles = ["student", "faculty", "staff"]
        unless roles.include?(role)
            errors.add(:role, "must be one of #{roles.join(', ')}")
        end
    end

    def generate_session_token
        while true
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end
end
