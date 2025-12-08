class User < ApplicationRecord
    has_secure_password

    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
    validates :password, allow_nil: true, length: {minimum: 6}
    validates :role, presence: true
    validate :role_must_be_valid


    has_many :tickets_created,
    class_name: "Ticket",
    foreign_key: :creator_id,
    dependent: :destroy

    has_many :tickets_assigned,
    class_name: "Ticket",
    foreign_key: :assignee_id,
    dependent: :nullify

    private
    def role_must_be_valid
        roles = ["student", "faculty", "staff"]
        unless roles.include?(role)
            errors.add(:role, "must be one of #{roles.join(', ')}")
        end
    end
end
