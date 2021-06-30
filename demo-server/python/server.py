import http.server
import socketserver
import re
from convert import create_messages

PORT = 8030

class HTTPRequestHandler(http.server.BaseHTTPRequestHandler):

  def cors_headers(self):
    self.send_header('Access-Control-Allow-Origin', '*')
    self.send_header('Access-Control-Allow-Methods', 'PUT')
    self.send_header('Access-Control-Allow-Headers', 'content-type,x-protozen-api-key,x-protozen-api-token')

  def do_OPTIONS(self):
    self.send_response(200)
    self.cors_headers()
    self.end_headers()

  def do_PUT(self):
    if None != re.search('/api/1.0/services/hello_service/world', self.path):
      request, response = create_messages('hello', 'world')
      request_length = int(self.headers["Content-Length"])
      request_payload = self.rfile.read(request_length)
      self.rfile.close()
      request.ParseFromString(request_payload)
      print('RQ', self.path, request);
      response.world = request.world + ' - Oh, yeah! Take off your pants and your panties. Shit on the floor.'
      response_payload = response.SerializeToString()
      self.send_response(200)
      self.cors_headers()
      self.send_header('Content-Type', 'application/x-protobuf')
      self.send_header('Content-Length', len(response_payload))
      self.end_headers()
      self.wfile.write(bytes(response_payload))
      self.wfile.flush()
    else:
      self.send_response(403)
      self.cors_headers()
      self.send_header('Content-Type', 'application/x-protobuf')
      self.end_headers()

with socketserver.TCPServer(("", PORT), HTTPRequestHandler) as httpd:
    print("serving at port", PORT)
    try:
      httpd.serve_forever()
    except KeyboardInterrupt:
      print('^C received, shutting down server')
      httpd.socket.close()
