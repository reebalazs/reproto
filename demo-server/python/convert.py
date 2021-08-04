
import hello_service_pb2
# HelloWorldResponseD = hello_service_pb2.DESCRIPTOR.message_types_by_name['HelloWorldResponse']
#
# print(HelloWorldResponseD)

def create_messages(service_name, method_name):
  camel_service_name = service_name.capitalize() + 'Service'
  ServiceD = hello_service_pb2.DESCRIPTOR.services_by_name[camel_service_name]
  if ServiceD is None:
    raise RuntimeError('No such service ' + service_name)
  for method in ServiceD.methods:
    if method.name.lower() == method_name:
      break
  else:
    raise RuntimeError('No such method ' + method_name + ' in service ' + service_name)
  Request = getattr(hello_service_pb2, method.input_type.name)
  Response = getattr(hello_service_pb2, method.output_type.name)
  return Request(), Response()
