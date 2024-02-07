import { categories } from "./categories";

export const shopInfo = {
  name: "Fashion Indiscreta",
  greeting: "Bem vindos a minha loja!",

  promo: {
    title: "Promoção de Verão",
    description: "Aproveite o desconto em alguns produtos",
    discountMessage: "50% de desconto",
  },

  footer: {
    categories: {
      title: "Categorias",
      category0: categories[0].label,
      category1: categories[1].label,
      category2: categories[2].label,
      category3: categories[3].label,
    },

    navigation: {
      category1: "/?category=Vestidos",
      category2: "/?category=Conjuntos",
      category3: "/?category=Macaquinhos",
    },

    services: {
      title: "Atendimento ao Cliente",
      service1: "Contato",
      service2: "Termo de compra e venda",
      service3: "Trocas e devoluções",
    },

    about: {
      title: "Sobre nós",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem odit earum aut pariatur, veritatis modi perspiciatis labore quam soluta, corrupti, et corporis enim! Ab in dicta vero tempore dignissimos nemo!",
    },

    socials: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/",
      youtube: "https://www.youtube.com/@",
    },
  },
};
