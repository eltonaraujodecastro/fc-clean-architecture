import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("1", "Product 1", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const productFindUseCase = new FindProductUseCase(productRepository);

    const input = {
      id: "1",
    };

    const output = {
      id: "1",
      name: "Product 1",
      price: 10
    };

    const result = await productFindUseCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const productFindUseCase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return productFindUseCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
