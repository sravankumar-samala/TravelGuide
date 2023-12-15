import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import convertJsonToJSObj from './convertJsonToJsonObject'
import './App.css'

// Replace your code here
function App() {
  const [packagesData, setPackagesData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [err, setErr] = useState(null)

  const getPackages = async (req, res) => {
    setIsPending(true)
    const baseUrl = 'https://apis.ccbp.in/tg/packages'

    try {
      const response = await fetch(baseUrl)
      const data = await response.json()
      if (!response.ok) throw new Error('Something went wrong!')
      const updatedData = convertJsonToJSObj(data.packages)
      console.log(updatedData)
      setPackagesData(updatedData)
    } catch (error) {
      console.log(error.message)
      setErr(error.message)
    } finally {
      setIsPending(false)
    }
  }

  useEffect(() => {
    getPackages()
  }, [])

  return (
    <div className="app-container">
      <h1>Travel Guide</h1>
      {isPending && <LoadingView />}
      {!isPending && packagesData?.length !== 0 && (
        <ul className="packages-list">
          {packagesData?.map(eachPackage => (
            <PackageItem key={eachPackage.id} packageData={eachPackage} />
          ))}
        </ul>
      )}
      {err && <p>{err}</p>}
    </div>
  )
}

export default App

function LoadingView() {
  return (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )
}

function PackageItem({packageData}) {
  const {name, description, imageUrl} = packageData

  return (
    <li className="package-item">
      <img src={imageUrl} alt={name} />
      <div className="package-content">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </li>
  )
}
