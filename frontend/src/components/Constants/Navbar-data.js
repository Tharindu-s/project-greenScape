import { categoryList } from "./Category-data";
import { materialList } from "./Material-data";
import { serviceList } from "./Service-data";

export const plants = categoryList.map((category) => ({
  title: category.label,
  href: `/categories/${category.value}`,
}));

export const materials = materialList.map((material) => ({
  title: material.title,
  href: `/materials/${material.value}`,
}));

export const services = serviceList.map((service) => ({
  title: service.title,
  href: `/services/${service.value}`,
}));
