class AddCreatorAndAssigneeToTickets < ActiveRecord::Migration[8.1]
  def change
    add_reference :tickets, :creator,
    null: false,
    foreign_key: {to_table: :users}

    add_reference :tickets, :assignee,
    null: true,
    foreign_key: {to_table: :users}
  end
end
