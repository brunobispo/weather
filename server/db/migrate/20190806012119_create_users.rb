class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :facebook_id
    end
    add_index :users, :facebook_id
  end
end
