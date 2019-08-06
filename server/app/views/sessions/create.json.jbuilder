json.name @result.user.name
json.token @result.token
json.cities @result.user.cities do |city|
  json.id city.id
  json.name city.name
  json.state city.state
end
