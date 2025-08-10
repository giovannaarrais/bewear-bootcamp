import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
    image: text("image"),
    createdAt: timestamp("created_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const sessionTable = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade" }),
});

export const verificationTable = pgTable("verification", {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});


export const accountTable = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

// tabela de categoria e de produtos possuem relacionamento

// categoria de produtos
export const categoryTable = pgTable("category", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    slug: text().notNull().unique(), // faz parte da url, contribui no SEO
    createdAt: timestamp().notNull().defaultNow(), //data de criação
});

// tabela de produtos
export const productTable = pgTable("product", {
    id: uuid().primaryKey().defaultRandom(),
    categoryId: uuid("category_id")
        .notNull()
        .references(() => categoryTable.id, {onDelete: 'set null'}), // esse registro é a relacao q existe com a table de categorias
        //set null -> for deletado da tabela productTable, o campo productId nas tabelas relacionadas será setado como null.
        
    name: text().notNull(),
    slug: text().notNull().unique(), // faz parte da url, contribui no SEO
    description: text().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(), //data de criação

    // obs: aq n vai ter o preço nem img, pois apenas na variante q vamos colocar -> pois pode variar o preço de acordo com a cor ou modelo
    // -> productVariant
});

// tabela para lidar com variacoes de produtos: uma roupa de diferentes cores
export const productVariantTable = pgTable("product_variant", {
    id: uuid().primaryKey().defaultRandom(),
    productId: uuid("product_id")
        .notNull()
        .references(() => productTable.id, {onDelete: "cascade"}),
        //cascade -> todos os registros que dependem dele também serão deletados
    name: text().notNull(),
    slug: text().notNull().unique(),
    color: text().notNull(), // permite a busca pela cor
    priceInCents: integer("prince_in_cents").notNull(), // nessa logica salva o preço em centavos
    imageUrl: text("image_url").array().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(), //data de criação
});

// ---------------- Relacionamentos

// uma categoria pode ter varios produtos
export const categoryRelations = relations(categoryTable, ({ many }) => ({
    products: many(productTable),
}));

// um produto pode ter apenas uma categoria
// o categoryId do produto referencia ao id da tabela de categoria
export const productRelations = relations(productTable, ({ one, many }) => ({
    category: one(categoryTable, {
        fields: [productTable.categoryId],
        references: [categoryTable.id],
    }),
  variants: many(productVariantTable), // indica q um produto pode ter varias variantes: cor, modelo, tamanho
}));

// o productId da variante se referencia ao id da tabela de produtos
export const productVariantRelations = relations(
    productVariantTable,
    ({ one }) => ({
        product: one(productTable, {
        fields: [productVariantTable.productId],
        references: [productTable.id],
        }),
    }),
);
