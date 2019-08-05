class CitiesRepository
  def self.search(term)
    return City.none unless term.present?

    City.where('unaccent(name) ilike unaccent(?)',
               "#{ActiveRecord::Base.sanitize_sql_like(term)}%")
  end
end
