json.ticket do
    json.extract! @ticket, :id, :title, :description, :status
    
    json.creator @ticket.creator
    if @ticket.assignees
        json.assignees do |assignee|
            json.id assignee.id
            json.name assignee.name
            json.email assignee.email 
        end
    end
end