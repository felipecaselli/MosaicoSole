export const structure = (S, context) => {
  const currentUser = context.currentUser;
  const userName = currentUser?.name?.toLowerCase() || '';
  
  // Felipe Caselli es el súper Administrador
  const isAdmin = userName.includes('felipe') || userName.includes('caselli') || currentUser?.roles?.some((r) => ['administrator', 'admin', 'owner'].includes(r.name));

  if (isAdmin) {
    // Admin View: See everything
    return S.list()
      .title('Admin Factory')
      .items([
        S.listItem()
          .title('Todas las Tiendas')
          .child(S.documentTypeList('store').title('Tiendas')),

        S.divider(),

        S.listItem()
          .title('Productos agrupados por Tienda')
          .child(
            S.documentTypeList('store')
              .title('Seleccionar Tienda')
              .child((storeId) =>
                S.documentList()
                  .title('Productos')
                  .filter('_type == "product" && store._ref == $storeId')
                  .params({ storeId })
                  .initialValueTemplates([
                    S.initialValueTemplateItem('product-by-store', { storeId }),
                  ])
              )
          ),

        S.divider(),

        S.listItem()
          .title('Data Raw: Todos los Productos')
          .child(S.documentTypeList('product').title('Productos')),
      ]);
  }

  // Tenant View: See ONLY their own store and products
  // Como Sanity a veces no devuelve el email, usaremos una lógica más laxa si es la mamá (Valen Mendel)
  // Reemplaza "su_correo@gmail.com" por el correo de verdad que ella use
  const fallbackEmail = userName.includes('valen') ? 'su_correo@gmail.com' : currentUser?.email;

  return S.list()
    .title('Mi Tienda')
    .items([
      S.listItem()
        .title('Mis Productos')
        .child(
          S.documentTypeList('store')
            .title('Mi Tienda')
            .filter('_type == "store" && ownerEmail == $userEmail')
            .params({ userEmail: fallbackEmail })
            .child((storeId) =>
              S.documentList()
                .title('Productos de mi Tienda')
                .filter('_type == "product" && store._ref == $storeId')
                .params({ storeId })
                .initialValueTemplates([
                  S.initialValueTemplateItem('product-by-store', { storeId }),
                ])
            )
        ),
    ]);
};
