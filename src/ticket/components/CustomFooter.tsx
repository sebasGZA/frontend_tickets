export const CustomFooter = () => {
  return (
    <footer className="border-t py-12 px-4 lg:px-8 mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            WEB / APP
            <p className="text-sm text-muted-foreground">
              Aplicacion web para el manejo de tickets de soporte.
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} WEB / APP. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
