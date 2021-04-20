export default function PageTitle({ children }) {
  return (
    <h1 className="text-3xl font-extrabold leading-9 justify-center tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 py-3 sm:py-6 border-b mb-4">
      {children}
    </h1>
  )
}
