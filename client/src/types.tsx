
export interface Company {
  id: number,
  name: string,
  short_name: string
}
export interface JobInitial {
  name: string,
  id: number,
  publication_date: string
  contents: string,
  locations: Array<Location>,
  company: Company,

}
export interface Location {
  name: string
}
export interface Job {
  id: JobInitial["id"],
  name: JobInitial["name"],
  locationName: Location["name"],
  companyName: Company["name"],
  date: string,
  contents: string,
}