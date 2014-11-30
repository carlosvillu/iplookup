# config/deploy/production.rb
set :stage, :production

server '92.222.40.10', user: 'carlosvillu', roles: %w{web app}

server '92.222.40.10',
  user: 'carlosvillu',
  roles: %w{web app},
  ssh_options: {
#    user: 'user_name', # overrides user setting above
#    keys: %w(~/.ssh/id_rsa),
    forward_agent: true,
    auth_methods: %w(publickey password),
    #password: 'use a key instead'
  }
