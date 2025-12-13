json.ticket do
    json.extract! @ticket, :id, :title, :description, :status, :category
    
    json.creator @ticket.creator
    if @ticket.assignees
        json.assignees do
            json.array! @ticket.assignees do |assignee|
                json.id assignee.id
                json.name assignee.name
                json.email assignee.email 
            end
        end
    end
end