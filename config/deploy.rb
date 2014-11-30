# config/deploy.rb

# probably a lot of ways to improve this...
set :application, 'iplookup'
set :repo_url, 'git@github.com:carlosvillu/iplookup.git'
# should set up a deploy user
set :user, 'carlosvillu'

set :deploy_to, '/home/carlosvillu/proyectos/iplookup'
set :scm, :git

set :format, :pretty
set :log_level, :debug
set :pty, true

set :keep_releases, 5

namespace :deploy do

  #TODO: Add stop task in upstart
  desc "Stop Forever"
  task :started do
    on roles(:app) do
      execute "pm2 stop #{application}"
    end
  end

  desc "Install node modules non-globally"
  task :npm_install do
    on roles(:app) do
      execute "cd #{current_path} && npm install"
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # This assumes you are using upstart to startup your application
      # - be sure that your upstart script runs as the 'deploy' user
      execute "pm2 start #{current_path} --name #{application}", raise_on_non_zero_exit: false
    end
  end

  before :restart, 'deploy:npm_install'

end
