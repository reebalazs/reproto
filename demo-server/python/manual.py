
import hello_service_pb2

# HelloWorldResponseD = hello_service_pb2.DESCRIPTOR.message_types_by_name['HelloWorldResponse']
#
# print(HelloWorldResponseD)

HelloServiceD = hello_service_pb2.DESCRIPTOR.services_by_name['HelloService']
HelloWorldMethodD = HelloServiceD.methods[0]

HelloWorldResponse = hello_service_pb2.__dict__[HelloWorldMethodD.output_type.name]

helloWorldResponse = HelloWorldResponse()

helloWorldResponse.world = 'Get schwifty!'

print(helloWorldResponse)

encoded = helloWorldResponse.SerializeToString()

print(encoded)

helloWorldResponse2 = HelloWorldResponse()
helloWorldResponse2.ParseFromString(encoded)

print(helloWorldResponse2)
