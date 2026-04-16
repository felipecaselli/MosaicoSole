export const structure = (S, context) => {
  const currentUser = context.currentUser;
  const isAdmin = currentUser?.roles?.some((r) => r.name === 'administrator');

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
  // The user must match the `ownerEmail` field in the `store` document.
  return S.list()
    .title('Mi Tienda')
    .items([
      S.listItem()
        .title('Mis Productos')
        .child(
          S.documentTypeList('store')
            .title('Mi Tienda')
            .filter('_type == "store" && ownerEmail == $userEmail')
            .params({ userEmail: currentUser?.email })
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
