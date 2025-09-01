import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicies from "../components/OurPolicies"
import NewsLetterBox from "../components/NewsLetterBox"

function Home() {
  return (
    <>
        <Hero />
        <LatestCollection />
        <BestSeller />
        <OurPolicies />
        <NewsLetterBox />
    </>
  )
}

export default Home
