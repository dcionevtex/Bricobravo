import React, { useState, useEffect, useRef } from 'react'
import style from './style.css'
import { Link } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import { Icon } from 'vtex.store-icons'
import arrowRight from '../../../assets/icons/arrowRightGray.svg'
import IconExample from '../../../assets/icons/iconExample.svg'
import { usePixel } from 'vtex.pixel-manager/PixelContext'

const CustomMegaMenu = ({ menuFirstLevel, linkUtil }) => {
  const node = useRef()
  const { isMobile } = useDevice()
  const [isOpen, setIsOpen] = useState()
  const [megamenu, setMegaMenu] = useState()
  const [whatSubCategoryIsOpen, setWhatSubCategoryIsOpen] = useState('')
  const { push } = usePixel()

  useEffect(() => {
    // add when mounted
    !isMobile && document.addEventListener('click', handleClickOutsideMenu)

    // return function to be called when unmounted
    return () => {
      !isMobile && document.removeEventListener('click', handleClickOutsideMenu)
    }
  }, [])

  const handleClickOutsideMenu = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return
    }
    // outside click
    setIsOpen(false)
    setIsSubmenuOpen(false)
  }

  const handleToggleMenu = (index, text) => {
    push({
      event: 'menu_selection',
      menu_item: text,
    })

    setIsOpen(true)
    setMegaMenu(index)
  }

  const mobileHandleToggleMenu = (index, text) => {
    push({
      event: 'menu_selection',
      menu_item: text,
    })

    if (isOpen && megamenu == index) {
      setIsOpen(false)
      setMegaMenu()
    } else if (isOpen && megamenu != index) {
      setIsOpen(true)
      setMegaMenu(index)
    } else {
      setIsOpen(true)
      setMegaMenu(index)
    }
  }

  return !isMobile ? (
    <nav className={style['top-navigation']}>
      <div className={style['container']}>
        <ul className={style['menu-department']}>
          {menuFirstLevel?.map(({ link, text, iconMobile }, index) => {
            return (
              <li
                ref={node}
                key={index}
                className={style['menu-header-category']}>
                <Link
                  to={link}
                  onMouseOver={() => handleToggleMenu(index, text)}
                  className={`${style['category-menu-item']} ${
                    megamenu === index && isOpen
                      ? style['category-menu-item--active']
                      : style['']
                  }`}>
                  <div className={`${style['col1']}`}>
                    <img
                      className={style['category-menu-item-icon']}
                      src={iconMobile}
                      alt="icon"
                    />
                    {text}
                  </div>
                  <img
                    className={`${style['col2']}`}
                    src={arrowRight}
                    alt="arrow"
                  />{' '}
                </Link>
              </li>
            )
          })}
          { linkUtil?.map(({ titleLinkUtil, links }) => (
            <div className={`${style['link-utili-container']}`}>
              <h3>{titleLinkUtil}</h3>
              {links?.map(({ link, text }) => (
                <li>
                  <Link to={link} className={`${style['category-menu-item']}`}>
                    {text}
                  </Link>
                </li>
            ))}
            </div>
          ))}
        </ul>
        {menuFirstLevel?.map(
          ({ menuSecondLevel, menuSecondLevelImage }, index) => {
            return (
              isOpen && (
                <div
                  key={index}
                  id="megamenu"
                  className={`${style['megamenu']} ${
                    megamenu === index && isOpen
                      ? style['megamenu--active']
                      : style['megamenu--inactive']
                  }`}>
                  {/* onMouseLeave={() => setIsOpen(false)}> */}
                  <img
                    src={menuSecondLevelImage}
                    alt="banner"
                    className={`${style['bannerSubCategory']}`}
                  />
                  <ul className={style['submenu-items']}>
                    {menuSecondLevel?.map(
                      ({ title, link, subCategories }, index) => {
                        return (
                          <li
                            key={index}
                            className={`${style['subcategory-container']}`}>
                            {link ? (
                              <a alt={title} title={title} href={link}>
                                <h5 className={`${style['subcategory-title']}`}>
                                  {title}
                                </h5>
                              </a>
                            ) : (
                              <h5 className={`${style['subcategory-title']}`}>
                                {title}
                              </h5>
                            )}

                            {subCategories?.map(({ text, link }, ind) => {
                              return (
                                <li
                                  key={ind}
                                  className={`${style['subcategory-item']}`}>
                                  <Link to={link}>{text}</Link>
                                </li>
                              )
                            })}
                          </li>
                        )
                      }
                    )}
                  </ul>
                </div>
              )
            )
          }
        )}
      </div>
    </nav>
  ) : (
    <>
      <nav className={style['mobile-top-navigation']}>
        <h2 className={style['mobile-title-name']}>Prodotti</h2>
        <div className={style['container']}>
          <ul className={style['mobile-menu-department']}>
            {menuFirstLevel?.map(({ text, iconMobile }, index) => {
              return (
                <li
                  key={index}
                  className={`${style['mobile-menu-header-category']} ${
                    megamenu == index && isOpen
                      ? style['mobile-menu-header-category--active']
                      : style['']
                  }`}
                  onClick={() => mobileHandleToggleMenu(index, text)}>
                  <div className={style['mobile-menu-icon-container']}>
                    <img
                      src={iconMobile}
                      className={style['category-menu-item-icon']}
                    />
                    <p className={style['category-menu-item']}>{text}</p>
                  </div>
                  <i
                    className={`${style['category-menu-arrow']} ${
                      megamenu == index && isOpen
                        ? style['category-menu-arrow--active']
                        : style['']
                    }`}></i>
                </li>
              )
            })}
            { linkUtil?.map(({ titleLinkUtil, links }) => (
              <div className={`${style['link-utili-container']}`}>
                <h3>{titleLinkUtil}</h3>
                {links?.map(({ link, text }) => (
                  <li>
                    <Link to={link} className={`${style['category-menu-item']}`}>
                      {text}
                    </Link>
                  </li>
                ))}
              </div>
          ))}
          </ul>
        </div>
      </nav>

      {menuFirstLevel?.map(({ link, text, iconMobile, menuSecondLevel }, index) => {
        return isOpen && index == megamenu ? (
          <div key={index} className={style['mobile-mega-menu']}>
            <h2
              className={style['mobile-mega-menu-title']}
              onClick={() => setIsOpen(false)}>
              {text}
            </h2>
            <Link to={link} className={style['mobile-mega-menu-link']}>Vedi tutti i prodotti</Link>
            <ul className={style['mobile-mega-menu-items']}>
              {menuSecondLevel?.map(({ title, link, subCategories }, index) => {
                return (
                  <>
                    <li
                      key={index}
                      className={style['mobile-menu-header-category']}
                      onClick={() => setWhatSubCategoryIsOpen(title)}>
                      <p className={style['category-menu-item']}>{title}</p>
                      <i className={style['category-menu-arrow']}></i>
                    </li>
                    <div
                      className={
                        whatSubCategoryIsOpen === title
                          ? style['mobile-subcategory-menu-items']
                          : style['subcategory-hidden']
                      }>
                      <h5
                        className={style['mobile-mega-menu-title']}
                        onClick={() => setWhatSubCategoryIsOpen('')}>
                        {title}
                      </h5>
                      <Link to={link} className={style['mobile-mega-menu-link']}>Vedi tutti i prodotti</Link>
                      <ul className={style['mobile-subcategory-overflow']}>
                        {subCategories?.map(({ text, link }, ind) => {
                          return whatSubCategoryIsOpen &&
                          title === whatSubCategoryIsOpen ? (
                            <>
                              <li
                                key={ind}
                                className={`${style['mobile-menu-header-subcategory']}`}
                                onClick={() => {
                                  setWhatSubCategoryIsOpen('')
                                  setIsOpen(false)
                                }}>
                                <Icon id={iconMobile} type="filled" />
                                <Link
                                  className={style['category-menu-item']}
                                  to={link}>
                                  {text}
                                </Link>
                              </li>
                            </>
                          ) : null
                        })}
                      </ul>
                    </div>
                  </>
                )
              })}
            </ul>
          </div>
        ) : null
      })}
    </>
  )
}

// Caso o componente não receba nenhuma props ele vai usar essas como default
CustomMegaMenu.defaultProps = {
  menuFirstLevel: [
    {
      link: '#',
      text: 'Giardinaggio',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          link: '#',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
    {
      link: '#',
      text: 'Piscine e accessori',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
    {
      link: '#',
      text: 'Arredo giardino',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
    {
      link: '#',
      text: 'Climatizzazione',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
    {
      link: '#',
      text: 'Cassette e box',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
    {
      link: '#',
      text: 'Bricolage e Fai da te',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
    {
      link: '#',
      text: 'Arredo casa',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
    {
      link: '#',
      text: 'Sport e tempo libero',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
    {
      link: '#',
      text: 'Antinfortunistica',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
    {
      link: '#',
      text: 'Illuminazione',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
    {
      link: '#',
      text: 'Riscaldamento',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
    {
      link: '#',
      text: 'Giocattoli',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
    {
      link: '#',
      text: 'Animali',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
    {
      link: '#',
      text: 'Elettrodomestici',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
    {
      link: '#',
      text: 'Auto e moto',
      iconMobile: IconExample,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Ferramenta',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
        {
          title: 'Aredo',
          subCategories: [
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
            {
              text: 'Lorem ipsum dolor sit amet',
              link: '#',
            },
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/1300x100.jpg',
    },
  ],
  linkUtil: [
    {
      titleLinkUtil: 'Link utili',
      links: [
        {
          text: 'Store Locator',
          link: '#'
        },
        {
          text: `Dov'è il mio ordine?`,
          link: '#'
        },
        {
          text: 'Effetuare un reso',
          link: '#'
        },
        {
          text: 'FAQ e contatti',
          link: '#'
        },
      ]
    }
  ]
}

// Aqui são configurados os schemas pra exibição no site editor
CustomMegaMenu.getSchema = () => {
  return {
    title: 'Menu Principal',
    description: 'Links do menu principal',
    type: 'object',
    properties: {
      menuFirstLevel: {
        type: 'array',
        title: 'Menu primeiro nível',
        items: {
          type: 'object',
          title: 'Categorias',
          properties: {
            text: {
              type: 'string',
              title: 'Texto de exibição',
              default: null,
            },
            link: {
              type: 'string',
              title: 'Link',
              default: null,
            },
            iconMobile: {
              type: 'string',
              title: 'Ícone do menu mobile',
              description: 'Ex: saude-e-bem-estar',
            },
            menuSecondLevel: {
              type: 'array',
              title: 'Menu segundo nível',
              items: {
                type: 'object',
                title: 'Dropdown Menu',
                properties: {
                  title: {
                    type: 'string',
                    title: 'Texto de exibição',
                    default: null,
                  },
                  link: {
                    type: 'string',
                    title: 'Link',
                    default: null,
                  },
                  subCategories: {
                    type: 'array',
                    title: 'Subcategories',
                    items: {
                      type: 'object',
                      title: 'links menu nivel 3',
                      properties: {
                        text: {
                          type: 'string',
                          title: 'Texto de subcategoria',
                          default: null,
                        },
                        link: {
                          type: 'string',
                          title: 'Link da subcategoria',
                          default: null,
                        },
                      },
                    },
                  },
                },
              },
            },
            menuSecondLevelImage: {
              type: 'string',
              title: 'Banner subCategoria',
              widget: {
                'ui:widget': 'image-uploader',
              },
            },
          },
        },
      },
      linkUtil: {
        type: 'array',
        title: 'Menu de links utils',
        items: {
          type: 'object',
          title: 'Seção de links',
          properties: {
            titleLinkUtil: {
              type: 'string',
              title: 'Titulo',
              default: null
            },
            links: {
              type: 'array',
              title: 'Links',
              items: {
                type: 'object',
                title: 'Links',
                properties: {
                  text: {
                    type: 'string',
                    title: 'Texto do link',
                    default: null
                  },
                  link: {
                    type: 'string',
                    title: 'Link',
                    default: null
                  }
                }
              }
            }
          }
        }
      }
    },
  }
}

export default CustomMegaMenu
