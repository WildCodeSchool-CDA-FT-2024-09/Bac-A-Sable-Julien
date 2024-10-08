import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { LightRepo, Repo } from "../entities/repo";
import { Status } from "../entities/status";
// import { Language } from "../entities/language";
// import { FindOperator, In } from "typeorm";

@InputType()
class RepoInput implements Partial<Repo> {
  @Field()
  id: number;

  @Field()
  url: string;

  @Field()
  name: string;

  @Field()
  isPrivate: number;

  // @Field()
  // languages: [Language]
}

@Resolver(Repo)
export default class RepoResolver {
  // Methode GET pour tous les repos
  @Query(() => [Repo])
  async fullrepos() {
    const repos = await Repo.find({
      relations: {
        status: true,
        languages: true,
      },
    });
    console.info(repos);
    return repos;
  }

  @Query(() => [LightRepo])
  async lightrepos() {
    const repos = await Repo.find();
    console.info(repos);
    return repos;
  }

  @Mutation(() => Repo)
  async createNewRepo(@Arg("data") newRepo: RepoInput) {
    console.info(newRepo);
    const repo = new Repo();

    repo.id = newRepo.id;
    repo.name = newRepo.name;
    repo.url = newRepo.url;

    const status = await Status.findOneOrFail({
      where: { id: +newRepo.isPrivate },
    });
    repo.status = status;

    await repo.save();
    console.log("repo", repo);
    const myRepo = await Repo.findOneOrFail({
      where: { id: newRepo.id },
      relations: {
        languages: true,
        status: true,
      },
    });
    console.log("myRepo", myRepo);
    return myRepo;
  }
} 