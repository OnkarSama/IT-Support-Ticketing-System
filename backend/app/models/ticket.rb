class Ticket < ApplicationRecord
    validates :title, presence: true, length: {maximum: 255}
    validates :description, presence: true, length: {maximum: 1000}
    validates :priority, presence: true, inclusion: {in: ["low", "medium", "high"]}
    belongs_to :creator,
    class_name: "User",
    foreign_key: :creator_id

    has_many :ticket_assignees, dependent: :destroy

    has_many :assignees, 
    through: :ticket_assignees, 
    source: :user

    private
    # def assigned_to_staff
    #     if assigned_to && assigned_to.role != "staff"
    #         erros.add(:assigned_to, "must be staff")
    #     end
    # end
end
