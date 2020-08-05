/** @jsx jsx */
import { Header as ThemeHeader, jsx, useColorMode, Styled } from "theme-ui"
import { Link } from "gatsby"
import Navigation from "./navigation"
import SocialLinks from "./social-links"

type MetaType = {
  meta: {
    [key: string]: string
  }
  nav: {
    title: string
    slug: string
  }[]
}

const Header = ({ meta, nav }: MetaType) => {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const toggleColorMode = (e: any) => {
    setColorMode(isDark ? `light` : `dark`)
  }

  const navEmpty = nav.length === 0

  return (
    <ThemeHeader>
      {!navEmpty && <Navigation nav={nav} />}
      <div
        sx={{

          fontSize: 3,
          display: `flex`,

          justifyContent: navEmpty ? `flex-start` : `left`,
          order: 1,
          zIndex: 1,
        }}
      >
        <Styled.a
          // aria-label={`${"Sam Beebe"}, Back to homepage`}  // {meta.siteTitle}
          aria-label={`Sam`}
          as={Link}
          sx={{ color: `text`, ":hover": { color: `primary`, textDecoration: `none` } }}
          to="/"
        >
        Sam Beebe
        </Styled.a>



      </div>
    </ThemeHeader>
  )
}

export default Header
