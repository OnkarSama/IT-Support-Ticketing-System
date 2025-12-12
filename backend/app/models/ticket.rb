class Ticket < ApplicationRecord
    validates :title, presence: true, length: {maximum: 255}
    validates :description, presence: true, length: {maximum: 1000}

    belongs_to :creator,
    class_name: "User",
    foreign_key: :creator_id

    belongs_to :assignee,
    class_name: "User",
    foreign_key: :assignee_id,
    optional: true

    private
    def assigned_to_staff
        if assigned_to && assigned_to.role != "staff"
            erros.add(:assigned_to, "must be staff")
        end
    end
end
