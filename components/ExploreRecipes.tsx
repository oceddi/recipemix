import { SearchBar, SearchResults } from '.'

const ExploreRecipes = ({searchParams} : { searchParams: URLSearchParams }) => {
  return (
    <div>
      <div className="home__filters mb-10">
        <SearchBar />
      </div>

      <section>
        <SearchResults searchParams={searchParams}/>
      </section>
    </div>
  )
}

export default ExploreRecipes