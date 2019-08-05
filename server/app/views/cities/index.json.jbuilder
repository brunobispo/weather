json.cities do |json|
  json.array! @cities do |city|
    json.id city.id
    json.name city.name
    json.state city.state
  end
end
