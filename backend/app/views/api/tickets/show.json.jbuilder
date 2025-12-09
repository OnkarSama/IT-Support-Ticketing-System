json.ticket do
    json.extract! @ticket, :id, :title, :description, :status
    
    json.creator @ticket.creator
    if @ticket.assignee
        json.assignee @ticket.assignee
    end
end