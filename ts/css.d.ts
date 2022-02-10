declare module "*.scss" {
  const css: { [key: string]: string };
  export default css;
}

declare module "*.png" {
  export default png as string;
}
