# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 


## Table of contents

- [Frontend Mentor - IP address tracker solution](#frontend-mentor---ip-address-tracker-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
  - [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![image](https://github.com/anotherinthefire/ip-address-tracker/assets/107034155/554ed1b6-5759-434d-8888-f7c37c8cc2a0)


### Links
- Live Site URL: [vercel](ip-address-tracker-five-gules.vercel.app)


### Built with

[React](https://reactjs.org/) - JavaScript Library

[Tailwind CSS](https://tailwindcss.com/) - for styling

[Vite.js](https://vitejs.dev/) - Build tool and development server

[Axios](https://github.com/axios/axios) - Promise-based HTTP client


[Leaflet](https://leafletjs.com/) - Interactive maps library

[React Leaflet](https://react-leaflet.js.org/) - React components for Leaflet maps

[React Router](https://reactrouter.com/) - Declarative routing for React

[ESLint](https://eslint.org/) - JavaScript linter tool

### What I learned

- How to build responsive and interactive user interfaces using React.
- Utilizing Tailwind CSS to style components efficiently and maintain a consistent design system.
- Setting up a fast and efficient development environment with Vite.js.
- Making API requests and handling responses using Axios.
- Integrating Leaflet maps into a React application with React Leaflet.
- Implementing client-side routing for seamless navigation using React Router.
- How to enforce code quality and best practices with ESLint.
- How to use .env file


```jsx
  const [address, setAddress] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const checkIpAddress = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
  const apiKey = import.meta.env.VITE_GEO_KEY;

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const res = await axios.get(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=8.8.8.8`
        );
        const data = res.data;
        setAddress(data);
      } catch (error) {
        console.trace(error);
      }
    };

    getInitialData();
  }, []);

  const getEnteredData = async () => {
    try {
      const res = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&${checkIpAddress.test(ipAddress)
          ? `ipAddress=${ipAddress}`
          : checkDomain.test(ipAddress)
            ? `domain=${ipAddress}`
            : ""}`
      );
      const data = res.data;
      setAddress(data);
    } catch (error) {
      console.trace(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getEnteredData();
    setIpAddress("");
  };
```
Note: importing env when using vite and cra are different.

https://www.smashingmagazine.com/2023/05/safest-way-hide-api-keys-react/

Marker Position
```jsx
export default function Markerposition({ address }) {
  const position = useMemo(() => {
    return [address.location.lat, address.location.lng]
  }, [address.location.lat, address.location.lng])
  const map = useMap()

  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    })
  }, [map, position])

  return (
    <>
      <Marker icon={icon} position={position}>
        <Popup>This is the location of the IP Address or Domain</Popup>
      </Marker>
    </>
  )
}
```


## Author

- Website - [suntzaur]((https://suntzaur-portfolio.vercel.app/))
- LinkedIn - [Ron Ultra](https://www.linkedin.com/in/ron-godfrey-ultra-036298241/)
