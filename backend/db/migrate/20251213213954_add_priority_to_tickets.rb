class AddPriorityToTickets < ActiveRecord::Migration[8.1]
  def change
    add_column :tickets, :priority, :string, null: false
    add_index :tickets, :priority
  end
end
