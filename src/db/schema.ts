import {  relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp,uuid } from "drizzle-orm/pg-core";

//tabela de usuários
export const userTable = pgTable("user", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
});

// tabela de categoria e de produtos possuem relacionamento

// categoria de produtos
export const categoryTable = pgTable("category", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    slug: text().notNull().unique(), // faz parte da url, contribui no SEO
    createdAt: timestamp().notNull().defaultNow(), //data de criação
})

// tabela de produtos
export const productTable = pgTable("product", {
    id: uuid().primaryKey().defaultRandom(),
    categoryId: uuid("category_id")
    .notNull()
    .references(() => categoryTable.id), // esse registro é a relacao q existe com a table de categorias
    name: text().notNull(),
    slug: text().notNull().unique(), // faz parte da url, contribui no SEO
    description: text().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(), //data de criação

    // obs: aq n vai ter o preço nem img, pois apenas na variante q vamos colocar -> pois pode variar o preço de acordo com a cor ou modelo
    // -> productVariant
});

// tabela para lidar com variacoes de produtos: uma roupa de diferentes cores
export const productVariantTable = pgTable("product_variant" , {
    id: uuid().primaryKey().defaultRandom(),
    productId: uuid("product_id")
    .notNull()
    .references(() => productTable.id),
    name: text().notNull(),
    slug: text().notNull().unique(), 
    color: text().notNull(), // permite a busca pela cor
    priceInCents: integer("prince_in_cents").notNull(), // nessa logica salva o preço em centavos
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(), //data de criação
})

// ---------------- Relacionamentos

// uma categoria pode ter varios produtos
export const categoryRelations = relations(categoryTable, ({ many }) => ({
    products: many(productTable),
}))


// um produto pode ter apenas uma categoria 
// o categoryId do produto referencia ao id da tabela de categoria
export const productRelations = relations(productTable , ({ one, many }) => ({
    category: one(categoryTable, {
        fields: [productTable.categoryId],
        references: [categoryTable.id]
    }),
    variants: many(productVariantTable) // indica q um produto pode ter varias variantes: cor, modelo, tamanho
}))

// o productId da variante se referencia ao id da tabela de produtos
export const productVariantRelations = relations(productVariantTable, ({one}) => ({
        product: one(productTable, {
            fields: [productVariantTable.productId],
            references: [productTable.id]
        })
}))