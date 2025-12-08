json.array! @tickets do |ticket|
    json.extract! ticket, :id, :title, :description, :status, :created_at, :updated_at

    json.creator do
        json.id ticket.creator.id
        json.name ticket.creator.name
        json.email ticket.creator.email
    end

    json.assignee do
        if ticket.assignee
            json.id ticket.assignee.id
            json.name ticket.assignee.name
            json.email ticket.assignee.email
        end
     end
end