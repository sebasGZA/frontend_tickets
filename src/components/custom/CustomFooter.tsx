export const CustomFooter = () => {
  return (
    <footer className="border-t py-12 px-4 lg:px-8 mt-16">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <h3 className="font-semibold">Tickets.</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Aplicación web para el manejo de tickets de soporte.
          </p>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tickets. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}