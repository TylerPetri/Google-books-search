import { useState, useEffect, useRef } from 'react'
import { Link, Route, useHistory } from 'react-router-dom';
import axios from "axios";
import { GiBookshelf } from 'react-icons/gi'
import { ImSearch } from 'react-icons/im'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import Search from '../Search/Search'
import Library from '../Library/Library'
import SignUp from '../Signup/Signup'
import Button from '../Login/Button'
import NewPassword from '../NewPassword/NewPassword'
import ForgotPasswordAuth from '../ForgotPassword/ForgotPassword'
import { useStoreContext } from '../../utils/GlobalStore'

import './Navbar.css'


function Navbar() {

    const [{dropDown}, dispatch] = useStoreContext()
    const [showSearch, setSetShowSearch] = useState(false)
    const inputRef = useRef()
    let history = useHistory()

    useEffect(()=>{
        dispatch({type:'setSearchResults', data: {searchResults: 
            [
            {
              "volumeInfo": {
                  "title": "Ulysses",
                  "subtitle": "(Annotated Edition)",
                  "authors": [
                      "James Joyce"
                  ],
                  "publishedDate": "2021-02-18",
                  "description": "Joyce's novel is set in Dublin on the day of June 16, 1904 and the protagonist, Leopold Bloom, is a middle-aged Jew whose job as an advertisement canvasser forces him to travel throughout the city on a daily basis. While Bloom is Joyce's \"Ulysses\" character, the younger hero of the novel is Stephen Dedalus, the autobiographical character from Joyce's first novel, A Portrait of the Artist as a Young Man. While Joyce develops the character of the young student, most of the novel is focused on Bloom. Bloom's wife Molly is a singer and she is having an affair with her co-worker, Blazes Boylan, and early in the morning of June 16, Bloom learns that Molly intends to bring Boylan into their bed later that afternoon. The Blooms have a daughter named Milly (age 15) who is away, studying photography. Ten years ago, Molly gave birth to a son, Rudy, but he died when he was eleven days old and Bloom often thinks of the parallel between his dead son Rudy and his dead father Rudolph, who killed himself several years before.",
                  "industryIdentifiers": [
                      {
                          "type": "ISBN_13",
                          "identifier": "9798708409812"
                      }
                  ],
                  "readingModes": {
                      "text": false,
                      "image": false
                  },
                  "pageCount": 186,
                  "printType": "BOOK",
                  "maturityRating": "NOT_MATURE",
                  "allowAnonLogging": false,
                  "contentVersion": "preview-1.0.0",
                  "panelizationSummary": {
                      "containsEpubBubbles": false,
                      "containsImageBubbles": false
                  },
                  "imageLinks": {
                      "smallThumbnail": "http://books.google.com/books/content?id=BlU8zgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                      "thumbnail": "http://books.google.com/books/content?id=BlU8zgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                  },
                  "language": "en",
                  "previewLink": "http://books.google.ca/books?id=BlU8zgEACAAJ&dq=ulysses&hl=&cd=3&source=gbs_api",
                  "infoLink": "http://books.google.ca/books?id=BlU8zgEACAAJ&dq=ulysses&hl=&source=gbs_api",
                  "canonicalVolumeLink": "https://books.google.com/books/about/Ulysses.html?hl=&id=BlU8zgEACAAJ"
              }
          },
          {
            "volumeInfo": {
                "title": "Horror Fiction in the Global South",
                "subtitle": "Cultures, Narratives, and Representations",
                "authors": [
                    "Ritwick Bhattacharjee",
                    "Saikat Ghosh"
                ],
                "publisher": "Bloomsbury Academic India",
                "publishedDate": "2021-05-18",
                "description": "Horror Fiction in the Global South: Cultures, Narratives, and Representations believes that the experiences of horror are not just individual but also/simultaneously cultural. Within this understanding, literary productions become rather potent sites for the relation of such experiences both on the individual and the cultural front. It's not coincidental, then, that either William Blatty's The Exorcist or Gabriel Garcia Marquez's One Hundred Years of Solitude become archetypes of the re-presentations of the way horror affects individuals placed inside different cultures. Such an affectation, though, is but a beginning of the ways in which the supernatural interacts with the human and gives rise to horror. Considering that almost all aspects of what we now designate as the Global North, and its concomitant, the Global South – political, historical, social, economic, cultural, and so on – function as different paradigms, the experiences of horror and their telling in stories become functionally different as well. Added to this are the variations that one nation or culture of the east has from another. The present anthology of essays, in such a scheme of things, seeks to examine and demonstrate these cultural differences embedded in the impact that figures of horror and specters of the night have on the narrative imagination of storytellers from the Global South. If horror has an everyday presence in the phenomenal reality that Southern cultures subscribe to, it demands alternative phenomenology. The anthology allows scholars and connoisseurs of Horror to explore theoretical possibilities that may help address precisely such a need.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_10",
                        "identifier": "9390077273"
                    },
                    {
                        "type": "ISBN_13",
                        "identifier": "9789390077274"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 320,
                "printType": "BOOK",
                "categories": [
                    "Literary Criticism"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=vMOuzQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=vMOuzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.ca/books?id=vMOuzQEACAAJ&dq=one+hundred+year+of+solitude&hl=&cd=1&source=gbs_api",
                "infoLink": "http://books.google.ca/books?id=vMOuzQEACAAJ&dq=one+hundred+year+of+solitude&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Horror_Fiction_in_the_Global_South.html?hl=&id=vMOuzQEACAAJ"
            }
          },
          {
            "volumeInfo": {
                "title": "The Great Gatsby",
                "subtitle": "A Classic Literature & Fiction Novel: Annotated Edition",
                "authors": [
                    "F Scott Fitzgerald"
                ],
                "publishedDate": "2021-03-28",
                "description": "The Great Gatsby is a novel by the American author F. Scott Fitzgerald. It is published on April 10, 1925. It is mention the Long Island's North Shore and New York City during the 1922 summer. The novel chronicles an era that Fitzgerald himself dubbed the \"Jazz Age.\" By following the shock and chaos of World War I, American society enjoyed exceptional levels of prosperity during the \"roaring\" 1920s as the economy climbed gradually. At the same time, the ban imposed on the sale and manufacture of alcohol, made millionaires out of bootleggers and led to an increase in organized crime. Although Fitzgerald, like Nick Carraway in his novel, idolized the riches and glamor of the age, he was himself uncomfortable with the wild materialism and the lack of morality.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9798729656462"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 180,
                "printType": "BOOK",
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=RXhfzgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=RXhfzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.ca/books?id=RXhfzgEACAAJ&dq=the+great+gatsby&hl=&cd=4&source=gbs_api",
                "infoLink": "http://books.google.ca/books?id=RXhfzgEACAAJ&dq=the+great+gatsby&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/The_Great_Gatsby.html?hl=&id=RXhfzgEACAAJ"
            }
          },
          {
            "volumeInfo": {
                "title": "Moby Dick",
                "authors": [
                    "Herman Melville"
                ],
                "publisher": "FilRougeViceversa",
                "publishedDate": "2021-05-12",
                "description": "It was a clear steel-blue day. The firmaments of air and sea were hardly separable in that all-pervading azure; only, the pensive air was transparently pure and soft, with a woman's look, and the robust and man-like sea heaved with long, strong, lingering swells, as Samson's chest in his sleep.Hither, and thither, on high, glided the snow-white wings of small, unspeckled birds; these were the gentle thoughts of the feminine air; but to and fro in the deeps, far down in the bottomless blue, rushed mighty leviathans, sword-fish, and sharks; and these were the strong, troubled, murderous thinkings of the masculine sea.But though thus contrasting within, the contrast was only in shades and shadows without; those two seemed one; it was only the sex, as it were, that distinguished them.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9783985226153"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "3985226156"
                    }
                ],
                "readingModes": {
                    "text": true,
                    "image": true
                },
                "pageCount": 500,
                "printType": "BOOK",
                "categories": [
                    "Fiction"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "1.1.1.0.preview.3",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=xXkkEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=xXkkEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.ca/books?id=xXkkEAAAQBAJ&printsec=frontcover&dq=moby+dick&hl=&cd=1&source=gbs_api",
                "infoLink": "http://books.google.ca/books?id=xXkkEAAAQBAJ&dq=moby+dick&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Moby_Dick.html?hl=&id=xXkkEAAAQBAJ"
            }
          }
          ]
        }})
    },[])

    async function performSearch(){
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${inputRef.current.value}&orderBy=newest&langRestrict=en&maxResults=30`)
        dispatch({type:'setSearchResults', data: {searchResults: res.data.items}})
        inputRef.current.value = ''
        history.push('/')
    }

    function handleEnterKey(e) {
        if (e.key === "Enter") performSearch();
      }

    function showSearchBar() {
        !showSearch ? setSetShowSearch(true) : setSetShowSearch(false)
    }

    function logout(){
        dispatch({type: 'toggleDropDown', data: {dropDown: !dropDown}})
        dispatch({type:"USER_LOGOUT"})
    }

    function nodropdown(){
        dispatch({type:"CLOSE_DROPDOWN"})
    }

    return (
        <>
        <div className="invisiblebg" style={{display: dropDown ? 'block' : 'none'}} onClick={nodropdown}>
            <div className="signedDropdown" style={{display: dropDown ? 'block' : 'none'}}>
                <ul className="dropDownUl">
                    <li onClick={logout}><span className="liSpan"><RiLogoutBoxRLine className="logoutIcon"/><p className="liSignout">Sign out</p></span></li>
                </ul>
            </div>
        </div>
            <nav className="navbar flex-nowrap navClass">
                <div className="mobileSearch" style={{display: showSearch ? 'flex' : 'none'}}>
                    <HiOutlineArrowLeft onClick={showSearchBar} className="mobileArrow"/>
                    <div className="searchContainerMobile" style={{display: showSearch ? 'flex' : 'none'}}>
                        <input 
                            type="text" 
                            className="form-control mx-0 pb-2 searchInput" 
                            placeholder="Search"
                            ref={inputRef} onKeyDown={e=>handleEnterKey(e)}
                        ></input>
                        <Link to='/'>
                            <button type="submit" className="searchBtn" onClick={performSearch}>
                                <ImSearch className="btnIconSearch" />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="nonMobileNav" style={{display: !showSearch ? 'flex' : 'none'}}>
                    <Link to="/" className="devLink">
                    <h3 className="dev1">
                        <span>G</span>
                        <span className="oogle">oogle</span>
                    </h3>
                    <h3 className="dev2">
                        Books
                    </h3>
                    </Link>
                    <div className="searchContainer">
                        <input 
                            type="text" 
                            className="form-control mx-0 pb-2 searchInput" 
                            placeholder="Search"
                            ref={inputRef} onKeyDown={e=>handleEnterKey(e)}
                        ></input>
                        <Link to='/'>
                            <button type="submit" className="searchBtn" onClick={performSearch}>
                                <ImSearch className="btnIconSearch" />
                            </button>
                        </Link>
                    </div>
                    <div className="navItemsCont">
                        <ImSearch className="hiddenSearch" onClick={showSearchBar}></ImSearch>
                        <Link to='/saved' className="navLink"><GiBookshelf/></Link><span className="libraryPopUp">My Library</span>
                        <Button/>
                    </div>
                </div>
            </nav>
            <div className="wrapper">
                <Route exact path='/' component={Search}/>
                <Route exact path='/saved' component={Library}/>
                <Route exact path='/signup' component={SignUp}/>
                <Route exact path='/newpasswordAuth' component={ForgotPasswordAuth}/>
                <Route exact path='/newpassword' component={NewPassword}/>
            </div>
        </>
    )
}

export default Navbar