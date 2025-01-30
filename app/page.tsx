import Link from 'next/link'

const myClasses = {
  link: 'border-2 border-dotted rounded-lg text-center border-white dark:border-black px-4 py-2 my-4 mx-2'
}

export default function Home () {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <section className="flex flex-col h-max w-max">
        <Link className={myClasses.link} href={"/dynamicallyAddKeysToObjects"}>
          Dynamically Add Keys to Objects
        </Link>
        <Link className={myClasses.link} href={"/register-page"}>
          Register Page (React Library Test)
        </Link>
        <Link className={myClasses.link} href={"/balrog-new-ui"}>
          Balrog New UI test Page
        </Link>
        <Link className={myClasses.link} href={"/gallery"}>
          Gallery
        </Link>
        <Link className={myClasses.link} href={"/parallax-slider"}>
          Parallax slider
        </Link>
        <Link className={myClasses.link} href={"/scroll-pages"}>
          Scroll pages
        </Link>
        <Link className={myClasses.link} href={"/three"}>
          Three JS
        </Link>
        <Link className={myClasses.link} href={"/algolia"}>
          ALGOLIA SEARCH
        </Link>
        <Link className={myClasses.link} href={"/algolia"}>
          FUSE SEARCH
        </Link>
      </section>
    </main>
  );
}
