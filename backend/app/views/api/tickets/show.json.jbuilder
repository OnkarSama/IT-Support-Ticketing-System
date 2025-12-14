json.ticket do
    json.extract! @ticket, :id, :title, :description, :status, :category, :priority, :created_at, :updated_at
    
    json.creator do
        json.id @ticket.creator.id
        json.name @ticket.creator.name
        json.email @ticket.creator.email
    end

    if @ticket.assignees.any?
        json.assignees do
            json.array! @ticket.assignees do |assignee|
                json.id assignee.id
                json.name assignee.name
                json.email assignee.email 
            end
        end
    end
end