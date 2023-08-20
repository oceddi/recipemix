import { ExploreRecipes, Showcase } from '@/components'

export default async function Home({searchParams} : { searchParams : URLSearchParams } ) {

  return (
    <main className="overflow-hidden">
      <Showcase />
      <div className="mt-1 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Recipe Search</h1>
          <p>Explore Recipes you can try tonight</p>
        </div>

        <ExploreRecipes searchParams={searchParams}/>
      </div>
    </main>
  )
}
