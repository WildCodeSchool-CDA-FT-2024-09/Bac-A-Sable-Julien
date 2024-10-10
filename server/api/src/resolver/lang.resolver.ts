import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {  Language, LanguageInput } from "../entities/language";

@Resolver(Language)
export default class LanguageResolver {
  // Methode GET pour tous les repos
  @Query(() => [Language])
  async GetAllLang() {
    const repos = await Language.find({
      relations: {
        repos: true,
      },
    });
    // console.info(repos);
    return repos;
  }

  @Mutation(() => Language)
  async createNewLanguage(@Arg("data") newLanguage: LanguageInput) {
    console.info(newLanguage);
    const lang = new Language();

    lang.label = newLanguage.label;

    await lang.save();
    console.info("lang", lang);
    const myLang = await Language.findOne({
      where: { id: lang.id },
      relations: {
        repos: true,
      },
    });
    console.info("myLang", myLang);
    return myLang;
  }
} 