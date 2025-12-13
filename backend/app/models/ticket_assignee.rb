class TicketAssignee < ApplicationRecord
    belongs_to :ticket
    belongs_to :user

    validates :user_id, uniqueness: {scope: :ticket_id}
end