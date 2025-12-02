class User < ApplicationRecord
    has_secure_password

    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
    validates :password, allow_nil: true, length: {minimum: 6}
    validates :role, presence: true
    validate :role_must_be_valid

    private
    def role_must_be_valid
        roles = ["student", "faculty", "staff"]

        unless roles.include?(role)
            errors.add(:role, "must be one of #{roles.join(', ')}")
        end
    end
end
