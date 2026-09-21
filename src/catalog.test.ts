import{describe,it,expect}from"vitest";import{products,categories,finishes}from"./catalog";
describe("Richa catalogue",()=>{
  it("contains the published room categories",()=>expect(categories).toEqual(["All","Beds","Sofas","Dining","Storage","Accents"]));
  it("keeps product data complete and showroom pricing at zero",()=>{
    for(const p of products){
      expect(p.name.length).toBeGreaterThan(3);
      expect(p.price).toBe(0);
      expect(p.regular).toBe(0);
      expect(p.features.length).toBeGreaterThan(1);
      expect(p.image).toMatch(/^https:\/\//);
    }
  });
  it("provides a usable finish system",()=>expect(finishes.length).toBeGreaterThanOrEqual(5));
});