class RemoveAssignee < ActiveRecord::Migration[8.1]
  def change
    remove_column :tickets, :assignee_id, :big_int 
  end
end
