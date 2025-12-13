class TicketAssignee < ApplicationRecord
    belongs_to :Ticket
    belongs_to :User

    validates :user_id, uniqueness: {scope: :ticket_id}
end