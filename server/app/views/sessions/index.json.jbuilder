json.name @user.name
json.cities @user.cities do |city|
  json.id city.id
  json.name city.name
  json.state city.state
end
