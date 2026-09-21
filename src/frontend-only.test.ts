import{describe,it,expect}from"vitest";
import{readFileSync,existsSync}from"node:fs";

describe("frontend-only architecture",()=>{
  it("does not call API routes from the app",()=>{
    const app=readFileSync(new URL("./App.tsx",import.meta.url),"utf8");
    expect(app).not.toContain("/api/");
  });
  it("has no serverless API directory",()=>{
    expect(existsSync(new URL("../api",import.meta.url))).toBe(false);
  });
});
