from setuptools import setup

setup(name='protozen-demo-server',
      version='0.1',
      description='Demo server for protozen',
      url='https://github.com/reebalazs/protozen',
      author='Balazs Ree',
      author_email='ree@greenfinity.hu',
      license='BSD-3-Clause',
      packages=['protozen-demo-server'],
      install_requires=[
          'google.protobuf',
      ],
      zip_safe=False)
