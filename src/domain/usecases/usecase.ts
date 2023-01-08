export interface IUsecase<DataType, ReturnType> {
  execute(data: DataType): Promise<ReturnType>;
}
