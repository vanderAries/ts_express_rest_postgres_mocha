import server from "../src/server";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

describe("Server", () => {
  it("should return Hello World!", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        chai.expect(res.text).to.equal("Hello World!");
        done();
      });
  });
});
