class MakeTicketStatusNullable < ActiveRecord::Migration[8.1]
  def change
    change_column_null :tickets, :status, true
  end
end
