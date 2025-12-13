class AddConstraintToTicketPriority < ActiveRecord::Migration[8.1]
  def change
    add_check_constraint :tickets, "priority IN ('low', 'medium', 'high')", name: "tickets_priority_check"
    change_column_default :tickets, :priority, "medium"
  end
end
